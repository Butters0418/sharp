(function () {
  const wH = $(window).width();

  // click event
  function hashLink() {
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      const targetTop = $($(this).attr('href')).offset().top;
      const scrollPos = wH < 1200 ? targetTop - 75 : targetTop;
      $('html, body').stop().animate({
        scrollTop: scrollPos,
      });
    });
  }
  hashLink();

  // products html
  function pdHtml() {
    let str = productsData
      .map((item, index) => {
        return `<div class="col-6" data-aos="fade-up" data-aos-delay="${index * 100}" >
    <a href="${item.url}" target="_blank" class="pd-link d-block h-100">
      <img src="${item.image}" />
      <p class="pd-name mb-0">${item.name}</p>
      <p class="pd-describe">${item.describe}</p>
      <div class="pd-footer">
        <p class="pd-price mb-0">特價$<span>${item.price}</span></p>
        <p class="pd-btn">立即訂購</p>
      </div>
    </a>
  </div>`;
      })
      .join('');
    $('.products .row').html(str);
  }
  pdHtml();

  // loading mask
  function loadingAni() {
    var imgs = document.images,
      len = imgs.length,
      counter = 0;
    [].forEach.call(imgs, function (img) {
      if (img.complete) incrementCounter();
      else img.addEventListener('load', incrementCounter, false);
    });
    function incrementCounter() {
      counter++;
    }
    var loadingtime = 1500;
    function countDown() {
      // console.log(loadingtime);
      loadingtime -= 300;
      if (loadingtime < 0 || (counter === len && loadingtime < 500)) {
        clearInterval(timer);
        $('.loading_mask').fadeOut(300);
        bannerAni();
      }
    }
    var timer = setInterval(countDown, 300);
  }
  loadingAni();

  function bannerAni() {
    let tl = gsap.timeline();
    tl.from('.banner__person--left', { duration: 0.8, xPercent: -150, opacity: 0, ease: 'power3.out' });
    tl.from('.banner__person--right', { duration: 0.8, xPercent: 150, opacity: 0, ease: 'power3.out' }, 0);
    tl.from('.banner__box', { duration: 0.6, yPercent: 150, opacity: 0, ease: 'back.out(1.7)', onComplete: function () {} }, 0.3);
    $('.banner__item').each(function () {
      const el = $(this);
      const delay = 0.3 + getRandom(5) / 10;
      let tl = gsap.timeline({ delay: delay });
      tl.from(el, { duration: 1.2, scale: 0, ease: 'elastic.out(1, 0.3)' });
      tl.from(el, { duration: 1, yPercent: 250, ease: 'back.out(1.7)' }, 0);
    });

    let bgSpeed = wH < 768 ? 20 : 15;
    let posY = '-1120px';
    if (wH > 1199) {
      posY = '-1120px';
    } else if (wH > 991) {
      posY = '-656px';
    } else if (wH > 575) {
      posY = '-645px';
    } else {
      posY = '-484px';
    }
    gsap.to('.wrap-bg', { duration: bgSpeed, backgroundPositionY: posY, ease: 'none', repeat: -1 });
  }

  // aos offset
  const aosOffset = wH > 767 ? 300 : 150;
  AOS.init({
    offset: aosOffset,
  });

  // get random
  function getRandom(x) {
    return Math.floor(Math.random() * x) + 1;
  }
})();
