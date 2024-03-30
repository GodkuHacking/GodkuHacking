// GitHub username
const username = 'GodkuHacking';

// Fetch user's repositories from GitHub API
fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
        // Initialize total commit count
        let totalCommits = 0;

        // Iterate through each repository to fetch commit counts
        const fetchCommitsPromises = repos.map(repo => {
            const repoName = repo.name;
            // Fetch commits for each repository
            return fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
                .then(response => response.json())
                .then(commits => {
                    // Add the number of commits in this repository to the total count
                    totalCommits += commits.length;
                });
        });

        // Wait for all fetches to complete and then update the widget
        Promise.all(fetchCommitsPromises)
            .then(() => {
                // Update commit count and grade
                document.getElementById('commit-count').textContent = totalCommits;
                let grade;
                if (totalCommits >= 500) {
                    grade = 'A';
                } else if (totalCommits >= 100) {
                    grade = 'B+';
                } else if (totalCommits >= 50) {
                    grade = 'B';
                } else {
                    grade = 'C';
                }
                document.getElementById('grade').textContent = grade;
            })
            .catch(error => console.error('Error fetching data:', error));
    })
    .catch(error => console.error('Error fetching data:', error));
