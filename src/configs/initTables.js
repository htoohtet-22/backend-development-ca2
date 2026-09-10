const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
}

bcrypt.hash('password', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
        DROP TABLE IF EXISTS User;
        DROP TABLE IF EXISTS Task;
        DROP TABLE IF EXISTS TaskProgress;
        DROP TABLE IF EXISTS City;
        DROP TABLE IF EXISTS Campaign;
        DROP TABLE IF EXISTS Message;

        CREATE TABLE User (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_logged_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            envi_points INT DEFAULT 0,
            eco_points INT DEFAULT 0,
            social_points INT DEFAULT 0
        );

        CREATE TABLE Task (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            points INT NOT NULL
        );

        CREATE TABLE TaskProgress (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            task_id INT NOT NULL,
            completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            notes TEXT
        );
        
        CREATE TABLE City (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            housing INT DEFAULT 0,
            power_supply INT DEFAULT 0,
            market INT DEFAULT 0
        );

        CREATE TABLE Campaign (
            id INT PRIMARY KEY AUTO_INCREMENT,
            description TEXT NOT NULL,
            required_envi_points INT NOT NULL,
            eco_points INT NOT NULL,
            social_points INT NOT NULL
        );

        CREATE TABLE Message (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            message_text LONGTEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        INSERT INTO User (username, email, password) VALUES
            ('admin', 'a@a.com', '${hash}'),
            ('user1', 'b@b.com', '${hash}'),
            ('user2', 'c@c.com', '${hash}'),
            ('user3', 'd@d.com', '${hash}')
        ;
        
        INSERT INTO City (user_id, name) VALUES
            (2, 'flame'),
            (3, 'aqua'),
            (4, 'nature')
        ;

        INSERT INTO Task (title, description, points) VALUES
            ('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
            ('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
            ('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
            ('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
            ('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35)
        ;
        `;

        pool.query(SQLSTATEMENT, callback);
    }
});
