cmd /K "%ConEmuDir%\..\init.bat && mongo mongodb://localhost/frozen-dev" -new_console:b:n:h5000:s1T60H:t:"mongo"
cmd /K "%ConEmuDir%\..\init.bat && npm start" -new_console:b:n:d:"C:\workspace\frozengem":h5000:s2T80V:t:"FO"
cmd /K "%ConEmuDir%\..\init.bat && npm start" -new_console:b:n:d:"C:\workspace\frozen-bo":h5000:s3T40V:t:"BO"
cmd /K "%ConEmuDir%\..\git-for-windows\bin\bash" -new_console:b:n:d:"C:\workspace\frozengem":h5000:s1T80V:t:"sh FO"
cmd /K "%ConEmuDir%\..\git-for-windows\bin\bash" -new_console:b:n:d:"C:\workspace\frozen-bo":h5000:s5T50V:t:"sh BO"
