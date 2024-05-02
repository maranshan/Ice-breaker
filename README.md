# Ice-breaker

# Developer Guide: Branching Strategy for User Stories

# Developer Guide: Branching Strategy for User Stories

## Branch Naming Convention
To easily identify the purpose and origin of each branch, we use a specific naming convention:
[user-story-number]-[short-description]

**Example:** If you're working on a development task related to user story number 03, and the task is to create a navbar for the homepage, the branch name would be:

03-make-navbar-for-homepage

## Steps to Create a New Branch

1. **Ensure you're on the main branch:** Before creating a new branch, switch to the main branch and pull the latest changes.

   ```bash
   `git checkout main`
   `git pull origin main`

git checkout [new-branch-name]
git checkout `03-make-navbar-for-homepage`
git push -u origin [branch-name]

## How to Make a New Branch in Git

Creating a new branch in your Git repository allows you to work on new features or fixes without affecting the main codebase. Here's how you can create a new branch:

- **Using the `git branch` command:**

  ```bash
  git branch [new-branch-name]


# Essential Git Commands and Their Uses

- `git init`
  Initializes a new Git repository. This command creates a new `.git` directory in the current working directory, which contains all necessary repository files.

- `git clone [url]`
  Creates a copy of an existing Git repository from a remote source. The URL specifies the location of the remote repository.

- `git add [file] / git add .` 
  Adds a file or changes in a file to the staging area. It tells Git that you want to include updates to a particular file in the next commit. Use `git add .` to add all changes in the current directory.

- `git commit -m "[commit message]"`
  Records or snapshots the changes made to the repository in the staging area. The commit message should be a brief description of the changes.

- `git stash pop`
  Applies the changes from the top stash in the stack to the current working directory and then removes the stashed changes from the stack. This command is useful for re-applying changes that were previously stashed with `git stash push` or `git stash` (which are equivalent). It's a way to bring back and continue working on changes that were temporarily set aside.

- `git status`
  Displays the state of the working directory and the staging area. It shows which changes have been staged, which haven't, and which files aren't being tracked by Git.

- `git push [remote] [branch]`
  Pushes the changes in your local repository up to the remote repository you specify. This is how you transfer commits from your local repository to a remote repo.

- `git pull [remote] [branch]`
  Fetches the changes from the remote repository and merges them into your local repository. This command is a combination of `git fetch` and `git merge`.

- `git branch`
  Lists all the local branches in the current repository. Use `git branch [branch-name]` to create a new branch, and `git branch -d [branch-name]` to delete a branch.

- `git checkout [branch-name]`
  Switches to the specified branch and updates the working directory to match. Use `git checkout -b [branch-name]` to create and switch to a new branch simultaneously.

- `git merge [branch]`
  Merges the specified branch’s history into the current branch. This command is used to bring the changes from one branch into another.

- `git diff`
  Shows the differences between files in the working directory and the staging area. Use `git diff --staged` to see what's been staged for the next commit compared to the last commit.

- `git log`
  Shows the commit history for the current branch. Use various options to format the output, such as `--oneline`, `--graph`, etc.

- `git reset [file]`
  Removes the specified file from the staging area, but the file changes are preserved. Use `git reset --hard [commit]` to reset the staging area and working directory to match a past commit and discard all changes in the working directory.

- `git fetch [remote]`
  Downloads all the changes from the remote repository, but doesn't merge them into your local repository. Use `git fetch` to see what others have been working on.

Remember, the `[remote]` placeholder typically refers to the remote repository's name (often `origin`), and `[branch]` is the name of the branch you want to push to or pull from.


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.stud.idi.ntnu.no/tdt4140-2024/produktomraade-2/gruppe-36/ice-breaker.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.stud.idi.ntnu.no/tdt4140-2024/produktomraade-2/gruppe-36/ice-breaker/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
