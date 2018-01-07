var dummyUsers = ['Hulk', 'Wonder Woman', 'Captain America', 'Shaktiman', 'Pappu', 'Iron Man', 'Super Man', 'Ant man', 'Spider Man', 'Bat Man'];
var count = 0;

function addZero(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function currentTime() {
  var today = new Date();
  var h = today.getHours();
  m = addZero(m);
  var m = today.getMinutes();
  m = addZero(m);
  var s = today.getSeconds();
  s = addZero(s);
  return (h + ":" + m + ":" + s);
}

function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

function addCommenttoList(comment, nameOfId, hideInput=false) {
  let userId = Math.floor((Math.random() * 10) + 1) - 1;
  let addComment = document.getElementById(nameOfId);
  let timeStamp = currentTime();
  document.getElementById('commentInput').value = '';
  addComment.innerHTML += '<div class="commentList" id="comment-'+count+'"><div><img class="avtarImage" src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"/></div>'
  + '<div class="commentInfo"><div><span class="userName">'+dummyUsers[userId]+'</span> <span>- commented at '+timeStamp+'</span></div>'
  + '<div class="commentText">'+comment+'</div>'
  + '<div class="actionSection"><span class="vote">0</span>'
  + '<span><img class="arrow-up" src="https://png.icons8.com/android/50/000000/collapse-arrow.png"></span>'
  + '<span><img class="arrow-down" src="https://png.icons8.com/ios-glyphs/50/000000/expand-arrow.png"></span>'
  + '<span class="reply">Reply</span>'
  + '<span class="share">Share</span>'
  + '</div><div><input class="reply-input" type="text" id="reply-'+count+'" placeholder="Reply here..."/></div>'
  + '<div class="replyList" id="replyComment'+count+' "></div></div>'
  + '</div>';
  count = count + 1;
}

document.addEventListener('keypress', function (e) {
  if (hasClass(e.target, 'commentBox')) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is for enter
      let comment = document.getElementById('commentInput').value;
      if (comment !== '') {
        var nameOfId = 'addComment';
        addCommenttoList(comment, nameOfId);
      }
    }
  } else if (hasClass(e.target, 'reply-input')) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is for enter
      let comment = document.getElementById(e.target.closest('.commentList').id).querySelector(".reply-input").value;
      if (comment !== '') {
        var nameOfId = document.getElementById(e.target.closest('.commentList').id).querySelector(".replyList").id;
        addCommenttoList(comment, nameOfId);
        document.getElementById(e.target.closest('.commentList').id).querySelector(".reply-input").style.display = 'none';
        document.getElementById(e.target.closest('.commentList').id).querySelector(".reply-input").val = '';
      }
    }
  }
}, false);

document.addEventListener('click', function (e) {
  if (hasClass(e.target, 'arrow-up')) {
      let currentVote = parseInt(document.getElementById(e.target.closest('.commentList').id).querySelector(".vote").innerHTML)
      document.getElementById(e.target.closest('.commentList').id).querySelector(".vote").innerHTML = currentVote + 1;
  } else if (hasClass(e.target, 'arrow-down')) {
    let currentVote = parseInt(document.getElementById(e.target.closest('.commentList').id).querySelector(".vote").innerHTML)
    document.getElementById(e.target.closest('.commentList').id).querySelector(".vote").innerHTML = currentVote - 1;
  } else if (hasClass(e.target, 'reply')) {
    document.getElementById(e.target.closest('.commentList').id).querySelector(".reply-input").value = '';
    document.getElementById(e.target.closest('.commentList').id).querySelector(".reply-input").style.display = 'block';
  }
}, false);

