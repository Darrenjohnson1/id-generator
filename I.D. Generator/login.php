<!DOCTYPE html>
<html>
    <head>
        <title>I.D. Generator: Form Validation</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
        <div class="headerSpacer"></div>
        <div class="idCard" id="results">
            <div>
                <img src="img/dogResult.png" height="150" width="150" class="resultImg" alt="Confused dog with hat and glasses as profile picture">
            </div>
            <h2><?php echo($_POST['fName']); ?> <?php echo($_POST['lName']); ?></h2>
            <p>Phone Number: <?php echo($_POST['pNumber']); ?></p>
            <p>Email: <?php echo($_POST['eMail']); ?></p>
            <p>Web Site: <?php echo($_POST['wSite']); ?></p>
            <h3><?php echo($_POST['profession']); ?></h3>
        </div>
    </body>
</html>