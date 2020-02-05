<?php
header('Content-Type: application/json');
echo <<<JSON
{ "link" : "http://readmeansrun.com", "secure" : "https://readmeansrun.com", "email" : "davidfmiller@me.com", "bool" : true , "object" : { "string" : "Hello world", "number" : 42 }, "empty" : [ ], "nested" : [ "abc", true, { "foo" : "bar" } ] }
JSON;

?>