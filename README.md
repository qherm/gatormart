# csc648 Repository

## Visit the site!
[gatormart](http://ec2-35-168-3-139.compute-1.amazonaws.com/)

## Instructions for Running Locally
Clone the repo. 

Run `npm install`.

Install MySQL and run the `GatorMartDB.sql` script in the `application/db/` directory. Ensure that the posts/users table have at least 10 items.

Create a file titled `.env` in the /application directory containing the following fields:

1. DB_NAME - The name of the SQL Database.
2. DB_USER - Username for access to relevant MySQL database.
3. DB_PASSWORD - SQL Password.

Run `npm start`. The application should be up and running on port 3000. If items are not showing on the homepage or after searching, run the sql script again and ensure the proper connection is established to the db.

## Contributors

| Student Name | Student Email | GitHub Username | Position |
|    :---:     |     :---:     |     :---:       |     :---:       |
| Shane Waxler      |swaxler@mail.sfsu.edu               | qherm                 | Team Lead |
| Robert Garcia      |rgarcia35@mail.sfsu.edu               |RGarcia35                 | Backend Lead |
| Chuting Yan      |cyan3@mail.sfsu.edu               |cctina516                | Frontend Lead |
| Melissa Ho   |mho10@mail.sfsu.edu            |   melissah717              | Frontend |
| Xiaoqing Yao      |xyao1@mail.sfsu.edu               |yao961002                 | Frontend |
| Joe Guan      |jguan8@mail.sfsu.edu               |Joeguan1                 | Backend |
| Minggu Ma    |mma4@mail.sfsu.edu               |Macgoogle                 | Git Management |
