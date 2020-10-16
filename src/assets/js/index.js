import "@lottiefiles/lottie-player";
import AOS from "aos";
// require("../lottie/lf20_ynle8i40.json");
// require("../lottie/lf20_yYOpBn.json");

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

let setting_member_animation_delay = () => {
  $(".member-container").each((container_index, container) => {
    let window_width = $(window).width();
    let columns =
      window_width >= 1280
        ? 4
        : window_width >= 1024
        ? 3
        : window_width >= 640
        ? 2
        : 1;
    $(container)
      .find(".member")
      .each((index, member) => {
        $(member)
          .attr("data-aos", "fade-up")
          .attr("data-aos-delay", (index % columns) * 100);
      });
  });
};

$(() => {
  $(window).on("resize", setting_member_animation_delay);

  $(".nav-item").on("click", (event) => {
    $(".nav-item").removeClass("active");
    $(event.target).addClass("active");
  });
});

const banner_height = $("#banner").outerHeight();
$(window).on("scroll", () => {
  // Navbar Color
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
  setting_member_animation_delay();
  AOS.init();
});
