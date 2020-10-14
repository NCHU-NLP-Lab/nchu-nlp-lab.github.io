import "@lottiefiles/lottie-player";

let check_nav_active = () => {
  $(".nav-item").removeClass("active");
  $($(".nav-item").slice(1).get().reverse()).each((index, element) => {
    const section_element = $($(element).children("a").attr("href"));
    if (window.pageYOffset >= section_element.offset().top) {
      $(element).addClass("active");
      return false;
    }
  });
};

$.ready(() => {
  $(".nav-item").on("click", (event) => {
    $(".nav-item").removeClass("active");
    $(event.target).addClass("active");
  });
});

const banner_height = $("#banner").outerHeight();
$(window).on("scroll", () => {
  // Navbar Color
  console.log(banner_height);
  if (window.pageYOffset >= banner_height) {
    $("#navbar")
      .addClass("bg-white text-blue-700")
      .removeClass("bg-transparent text-white");
  } else {
    $("#navbar")
      .addClass("bg-transparent text-white")
      .removeClass("bg-white text-blue-700");
  }

  check_nav_active();
});
