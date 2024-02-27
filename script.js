class UserManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
    }

    login(username) {
        if (!username) {
            alert("Please enter a username");
            return;
        }

        const existingUser = this.users.find(user => user.username === username);
        if (existingUser) {
            this.currentUser = existingUser;
            this.currentUser.logins++;
            this.currentUser.lastLogin = new Date();
        } else {
            this.currentUser = {
                username: username,
                logins: 1,
                lastLogin: new Date()
            };
        
            this.users = [...this.users, this.currentUser];
            localStorage.setItem("users", JSON.stringify(this.users));
        }

        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        this.renderUserList();
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.currentUser = null;
        this.renderLoginForm();
    }

    renderLoginForm() {
        const loginForm = document.createElement("div");
        loginForm.innerHTML = `
            <input type="text" id="usernameInput" placeholder="Username">
            <button onclick="userManager.login(document.getElementById('usernameInput').value)">Login</button>
        `;
        document.getElementById("root").innerHTML = "";
        document.getElementById("root").appendChild(loginForm);

        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }

        const savedCurrentUser = localStorage.getItem("currentUser");
        if (savedCurrentUser) {
            this.currentUser = JSON.parse(savedCurrentUser);
            this.renderUserList();
        }
    }

    renderUserList() {
        const userListContainer = document.createElement("div");
        userListContainer.innerHTML = `<h2>Connected Users</h2><ul id="userList"></ul>`;
    
        const userList = userListContainer.querySelector("#userList");
        this.users.forEach(user => {
            const userItem = document.createElement("li");
            userItem.innerHTML = `
                <div>Username:${user.username}</div>
                <div>Quantity Logged: ${user.logins}</div>
                <div>Last Login: ${user.lastLogin}</div>
            `;
            userList.appendChild(userItem);
        });
    
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.onclick = () => this.logout();
        userListContainer.appendChild(logoutButton);
    
        document.getElementById("root").innerHTML = "";
        document.getElementById("root").appendChild(userListContainer);
    }
    
}

const userManager = new UserManager();
userManager.renderLoginForm();
