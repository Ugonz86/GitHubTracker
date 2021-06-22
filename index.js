// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username, id) {

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;

    // const profile = `https://api.github.com/users/${username}`;

    // const avatar = `https://avatars.githubusercontent.com/u/${id}`;

    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);

    // When request is received
    // Process it here
    xhr.onload = function () {

        // Parse API data into JSON
        const data = JSON.parse(this.response);
        // Get the ul with id of of userRepos
        let root = document.getElementById('userRepos');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');
            let li = document.createElement('li');
            li.classList.add('list-group-item')
            li.innerHTML = (`
            <p><strong>No account exists with username:</strong> ${username}</p><p>Please try again.</p>`);
            ul.appendChild(li);
        } else {

            // // Get the ul with id of of userRepos
            let ul = document.getElementById('userRepos');

            // Create variable that will create li's to be added to ul
            let p = document.createElement('p');

            p.innerHTML = (`<p style="text-align: center"><strong>Number of Public Repos for ${username}: ${data.length}</p>`)
            ul.appendChild(p);

            let img = document.createElement('img');
            img.src =
                `https://avatars.githubusercontent.com/${username}`;
                img.style.width="35%";
                img.style.borderRadius="50%";
                img.style.margin="auto";
                img.style.marginBottom="35px"
                ul.appendChild(img);

            // Loop over each object in data array
            for (let i in data) {
                let li = document.createElement('li');
                //Condition to sort by size (descending)
                data.sort(function (a, b) {
                    return a.size > b.size ? -1 : 1
                });

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item');

                // Create the html markup for each li
                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                <p><strong>Updated at:</strong> <a href="${data[i].updated_at}">${data[i].updated_at}</a></p>
                <p><strong>Size:</strong> ${data[i].size}</p>
            `);

                // Append each li to the ul
                ul.appendChild(li);

            }
        }
    }

    // Send the request to the server
    xhr.send();

}