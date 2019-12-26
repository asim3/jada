let BOARD_MEMBERS = undefined;
let BOARD_MEMBERS_INDEX = 0;


function easeOutQuad(t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
}


function toggle_side_navigation(event) {
  const navbar_collapse = document.getElementById("side_navigation");
  const navbar_root = document.getElementById("side_navigation_root");
  if(navbar_collapse.style.display !== 'block') {
    document.body.style.overflow = "hidden";
    navbar_root.style.display = 'block';
    navbar_collapse.style.display = 'block';
    current_step = 0
    const is_rtl = window.location.href.includes("/AR/");
    function navbar_collapse_height() {
      height = easeOutQuad(current_step++, 0, 20, 20);
      if(is_rtl) {
        navbar_collapse.style.right = height - 20 + 'rem';
      }
      else {
        navbar_collapse.style.left = height - 20 + 'rem';
      }
      if(height < 20) {
        requestAnimationFrame(navbar_collapse_height)
      }
    }
    requestAnimationFrame(navbar_collapse_height)
  }
  else {
    navbar_collapse.style.display = 'none';
    navbar_root.style.display = 'none';
    document.body.style.overflow = "auto";
  }
}


function show_board_member(name) {
  if(BOARD_MEMBERS == undefined) {
    let url = "../static/json/board_members.json"
    if(window.location.href.includes("/AR/")) {
      url = "../static/json/board_members_ar.json"
    }
    fetch(url)
      .then(data => data.json())
      .then(function(data) {
        BOARD_MEMBERS = data;
        show_board_member(name);
      })
  }
  else {
    BOARD_MEMBERS_INDEX = BOARD_MEMBERS.findIndex(obj => obj.id === name)
    member = BOARD_MEMBERS.find(obj => obj.id === name)
    const root = document.getElementById("navigation_root");
    document.getElementById("member_name").innerHTML = member.name;
    document.getElementById("member_title").innerHTML = member.title;
    document.getElementById("member_info").innerHTML = member.info;
    root.style.display = 'block';
    document.body.style.overflow = "hidden";
  }
}


function next_member(next) {
  let member_index = BOARD_MEMBERS_INDEX
  if(next === 'next') {
    member_index++
  }
  else if(next === 'previous') {
    member_index--
  }

  member = BOARD_MEMBERS[member_index]
  if(!member) {
    console.error("not found!")
  }
  else {
    show_board_member(member.id)
  }
}

function hide_navigation() {
  const root = document.getElementById("navigation_root");
  root.style.display = 'none';
  document.body.style.overflow = "auto";
}


function add_video_to_home() {
  const video_root = document.getElementById("video_root");
  if (video_root) {
    const video = document.createElement("video");
    video.src = "../static/video/video_2.mp4";
    video.type = "video/mp4";
    video.controls = true;
    video.muted = true;
    video.autoplay = true;
    video.playsinline = true;
    video.loop = true;
    video_root.appendChild(video);
  }
}


window.onload = function() {
  document.getElementById("show_side_navigation")
    .addEventListener("click", toggle_side_navigation);

  document.getElementById("side_navigation_root")
    .addEventListener("click", toggle_side_navigation);

  document.getElementById("side_navigation_close")
  .addEventListener("click", function(event) {
    event.stopPropagation();
    toggle_side_navigation();
  });

  const ln_ar = document.getElementById("ln_ar")
  if(ln_ar) {
    ln_ar.addEventListener("click", function(event) {
      let href = window.location.href;
      href = href.replace("/EN/", "/AR/")
      window.location.href = href
    });
  }

  const ln_en = document.getElementById("ln_en")
  if(ln_en) {
    ln_en.addEventListener("click", function(event) {
      let href = window.location.href;
      href = href.replace("/AR/", "/EN/")
      window.location.href = href
    });
  }
  
  setTimeout(add_video_to_home, 0);
};