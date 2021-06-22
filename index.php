<?php

function version($file, $type = '')
{
  static $manifest = [];
  static $manifestPath;
  $buildDirectory = 'dist';

  if (empty($manifest) || $manifestPath !== $buildDirectory) {
    $path = dirname(__FILE__) . ('/dist/manifest.json');

    if (file_exists($path)) {
      $manifest = json_decode(file_get_contents($path), true);
      $manifestPath = $buildDirectory;
    }
  }

  $file = ltrim($file, '/');

  if (isset($manifest[$file])) {
    return '/' . trim($buildDirectory . $manifest[$file], '/');
  }

  throw new InvalidArgumentException("File {$file} not defined in asset manifest.");
}

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="<?php echo version('main.css'); ?>" />
  </head>
  <body>
    <main class="site">
      <header class="js-item">
        <h1>Milly</h1>
      </header>
      <section>
        <h2>Content</h2>
        <p class="text-orange">Here is some content.</p>
        <div class="img-container">
          <img src="<?php echo version('img/milly.jpg'); ?>" alt="Milly" width="420" height="560" />
        </div>
      </section>
      <footer class="js-item">
        &copy; <?php echo date('Y'); ?> Milly
      </footer>
    </main>
    <script src="<?php echo version('main.js'); ?>"></script>
  </body>
</html>