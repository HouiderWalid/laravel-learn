<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
        }
        .bord{
            outline: 5px solid green;
        }
    </style>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
<div id="app" class="vh-100 overflow-hidden">
    <v-root></v-root>
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
