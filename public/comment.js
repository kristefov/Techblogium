const commentHandler = async (event) => {
    console.log('comment handler')
    event.preventDefault();

    

    const blog_id = document.querySelector('.blog-id').dataset.id;
    const content = document.querySelector('#comment-content').value;
    console.log(blog_id)
    
    const response = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify({ content, blog_id }),   
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}
// document.getElementById('comment').addEventListener('click', commentHandler);
// // const btns = document.querySelectorAll('#comment');
// // Array.from(btns).forEach(function(btn) {
// //   btn.addEventListener('click', commentHandler);
// // });

// document.getElementById("comment").addEventListener("click", commentHandler)
  

  

// document.querySelector(".group-blogs").addEventListener("click", function(e){
//     const target = e.target; // Or any other selector.
//     console.log(e.target);
    
//     if(target === 'button'){
//       commentHandler(e);
//     }
//   });
document.querySelector(".group-blogs").addEventListener("click", function(e){
    const target = e.target; // Or any other selector.
    // console.log(e.target);
    
    if(target.matches('button')){
        console.log(target);
      commentHandler(e);
    }
  });