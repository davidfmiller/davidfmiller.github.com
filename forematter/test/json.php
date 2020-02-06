<?php
header('Content-Type: application/json');
echo <<<JSON
{ "home" : "https://readmeansrun.com", "forematter" : "https://readmeansrun.com/forematter", "email" : "name@domain.com", "bool" : true , "object" : { "string" : "Hello world", "number" : 42 }, "empty" : [ ], "nested" : [ "abc", true, { "foo" : "bar" } ] }
JSON;

?>
