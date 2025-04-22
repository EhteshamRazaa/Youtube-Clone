for (let i = 0; i < 2; i++) {
  document.querySelectorAll(".menu")[i].addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("d-none");
    document.querySelector(".mini-sidebar").classList.toggle("d-none");
    document.querySelector(".sidebar").classList.toggle("tranlate");
    document.querySelector(".overlay").classList.toggle("d-none");
    document.querySelector(".content").classList.toggle("ml-72");
    document.querySelector(".content").classList.toggle("w-72");
    document.querySelector(".feed-filter").classList.toggle("w-72");
  });
}

const key = "AIzaSyDSVlWwlx73jqziDlRMu1eHIGv7zrMsly0";

const maxResults = 50;

const channel =
  "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=";

const url =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=";

var cards = "";

async function getVideos() {
  const response = await fetch(url + maxResults + "&key=" + key);
  var data = await response.json();
  data.items.forEach(function (index) {
    // console.log(index.snippet);
    getChannelDets(index.snippet);
    // cards += `<div class="card">
    // <a href="">
    //       <div class="card-img">
    //         <img
    //           src="${index.snippet.thumbnails.high.url}"
    //           alt=""
    //         />
    //       </div>
    //       <div class="card-dets flex">
    //         <div class="channel">
    //           <img
    //             src="https://yt3.ggpht.com/_gOHYpMTNNnbWfMQ7CoqVlrzdJ7jPoVclI9eKvq0XBBahPY-NS_uFPpIZWTDgszNT1s4lyz-hw=s68-c-k-c0x00ffffff-no-rj"
    //             alt=""
    //           />
    //         </div>
    //         <div class="card-text">
    //           <h2>
    //           ${index.snippet.title}
    //           </h2>
    //           <div class="channel-name">${index.snippet.channelTitle}</div>
    //           <div class="channel-data">
    //             <span class="subscribers">4.3K views</span
    //             ><span class="upload-time">8 days ago</span>
    //           </div>
    //         </div>
    //         <div class="card-btn flex">
    //           <svg height="24" viewBox="0 0 24 24" width="24">
    //             <path
    //               d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
    //             ></path>
    //           </svg>
    //         </div>
    //       </div>
    //     </a>
    //     </div>`;
  });
  // document.querySelector(".cards").innerHTML = cards;
}

async function getChannelDets(channelid) {
  const response = await fetch(channel + channelid.channelId + "&key=" + key);
  var data1 = await response.json();
  // console.log(channelid);
  cards += `<div class="card">
    <a href="">
          <div class="card-img">
            <img
              src="${channelid.thumbnails.high.url}"
              alt=""
            />
          </div>
          <div class="card-dets flex">
            <div class="channel">
              <img
                src="${data1.items[0].snippet.thumbnails.default.url}"
                alt=""
              />
            </div>
            <div class="card-text">
              <h2>
              ${channelid.title}
              </h2>
              <div class="channel-name">${channelid.channelTitle}</div>
              <div class="channel-data">
                <span class="subscribers">${nFormatter(data1.items[0].statistics.viewCount)} views</span
                ><span class="upload-time">${data1.items[0].snippet.publishedAt} ago</span>
              </div>
            </div>
            <div class="card-btn flex">
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path
                  d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
                ></path>
              </svg>
            </div>
          </div>
        </a>
        </div>`;
  document.querySelector(".cards").innerHTML = cards;
  console.log(data1.items[0].snippet.publishedAt);
}

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

getVideos();

// https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDSVlWwlx73jqziDlRMu1eHIGv7zrMsly0&part=snippet&chart=mostPopular&maxResults=1&regionCode=IN

// console.log(
//   "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDSVlWwlx73jqziDlRMu1eHIGv7zrMsly0&part=snippet&chart=mostPopular&maxResults=1&regionCode=IN"
// );
