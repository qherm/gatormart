# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP
    <br>Public IPv4 address
    <br>54.237.46.1
    <br>Public IPv4 DNS
    <br>ec2-54-237-46-1.compute-1.amazonaws.com
    
2. SSH username
    <br>ubuntu

3. SSH password or key.
    <br>Key has been uploaded to the credentials folder.
    
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
    <br>localhost
5. Database username
    <br>root
7. Database password
    <br>''
9. Database name (basically the name that contains all your tables)
    <br>Example (will change later)
    
8. Instructions on how to use the above information.
<br>Download csc648.pem SSH key and put it in the .ssh folder in your user directory.
<br>Once put in there, start your terminal and cd to .ssh
<br>Once there, use this command to connect to the server
<br>ssh -i csc648.pem ubuntu@54.237.46.1
<br>At this point, you should be able to log into the server, from there cd into the
<br>csc648-03-sp22-team02/application/ folder
<br>There you can use node runServer.js to start the server and allow the user to browse the webpages.

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
