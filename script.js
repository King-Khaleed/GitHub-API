document.addEventListener('DOMContentLoaded', function() {
    var themeToggleBtn = document.getElementById('themeToggle');
    var themeText = document.getElementById('themeText');
    var themeIcon = document.getElementById('themeIcon');
    var searchButton = document.getElementById('searchButton');
    var userInfo = document.getElementById('userInfo');
    var userAvatar = document.getElementById('userAvatar');
    var userName = document.getElementById('userName');
    var userBio = document.getElementById('userBio');
    var userFollowers = document.getElementById('userFollowers');
    var userFollowing = document.getElementById('userFollowing');
    var userRepos = document.getElementById('userRepos');
    var userBlog = document.getElementById('userBlog');
    var userTwitter = document.getElementById('userTwitter');

    // Set initial theme
    var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkScheme) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeText.textContent = 'Light';
            themeIcon.textContent = '☀';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeText.textContent = 'Dark';
            themeIcon.textContent = '🌙';
        }
    });

    searchButton.addEventListener('click', function() {
        var username = document.getElementById('searchInput').value.trim();
        if (username === '') return;

        fetch('https://api.github.com/users/' + username)
            .then(function(response) {
                if (!response.ok) {
                    // alert.error('USER NOT FOUND')
                    throw new Error('User not found');
                }
                // console.log(response)
                return response.json();
            })
            .then(function(data) {
                userInfo.classList.remove('hidden');
                userAvatar.src = data.avatar_url || ''; 
                userAvatar.alt = (data.name || data.login) + "'s avatar";
                userName.textContent = data.name || data.login;
                userBio.textContent = data.bio || 'This profile has no bio';
                userFollowers.textContent = data.followers;
                userFollowing.textContent = data.following;
                userRepos.textContent = data.public_repos;
                userBlog.href = data.blog || '#';
                userBlog.textContent = data.blog || 'Not available';
                userTwitter.href = data.twitter_username ? 'https://twitter.com/' + data.twitter_username : '#';
                userTwitter.textContent = data.twitter_username ? '@' + data.twitter_username : 'Not available';
            })
            .catch(function(error) {
                alert('User not found! Please try another username.');
                userInfo.classList.add('hidden');
            });
    });
});


// data types
// dom manupulation
// eventlisters
// json
// tinary operators