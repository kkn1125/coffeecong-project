@REM ----------------------------------------------------------------------------
@REM Copyright 2001-2004 The Apache Software Foundation.
@REM
@REM Licensed under the Apache License, Version 2.0 (the "License");
@REM you may not use this file except in compliance with the License.
@REM You may obtain a copy of the License at
@REM
@REM      http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing, software
@REM distributed under the License is distributed on an "AS IS" BASIS,
@REM WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM See the License for the specific language governing permissions and
@REM limitations under the License.
@REM ----------------------------------------------------------------------------
@REM

@echo off

set ERROR_CODE=0

:init
@REM Decide how to startup depending on the version of windows

@REM -- Win98ME
if NOT "%OS%"=="Windows_NT" goto Win9xArg

@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" @setlocal

@REM -- 4NT shell
if "%eval[2+2]" == "4" goto 4NTArgs

@REM -- Regular WinNT shell
set CMD_LINE_ARGS=%*
goto WinNTGetScriptDir

@REM The 4NT Shell from jp software
:4NTArgs
set CMD_LINE_ARGS=%$
goto WinNTGetScriptDir

:Win9xArg
@REM Slurp the command line arguments.  This loop allows for an unlimited number
@REM of arguments (up to the command line limit, anyway).
set CMD_LINE_ARGS=
:Win9xApp
if %1a==a goto Win9xGetScriptDir
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto Win9xApp

:Win9xGetScriptDir
set SAVEDIR=%CD%
%0\
cd %0\..\.. 
set BASEDIR=%CD%
cd %SAVEDIR%
set SAVE_DIR=
goto repoSetup

:WinNTGetScriptDir
set BASEDIR=%~dp0\..

:repoSetup


if "%JAVACMD%"=="" set JAVACMD=java

if "%REPO%"=="" set REPO=%BASEDIR%\repo

set CLASSPATH="%BASEDIR%"\etc;"%REPO%"\org\apache\tiles\tiles-jsp\3.0.8\tiles-jsp-3.0.8.jar;"%REPO%"\org\apache\tiles\tiles-servlet\3.0.8\tiles-servlet-3.0.8.jar;"%REPO%"\org\apache\tiles\tiles-core\3.0.8\tiles-core-3.0.8.jar;"%REPO%"\commons-digester\commons-digester\2.0\commons-digester-2.0.jar;"%REPO%"\commons-beanutils\commons-beanutils\1.8.0\commons-beanutils-1.8.0.jar;"%REPO%"\org\apache\tiles\tiles-request-servlet\1.0.7\tiles-request-servlet-1.0.7.jar;"%REPO%"\org\apache\tiles\tiles-template\3.0.8\tiles-template-3.0.8.jar;"%REPO%"\org\apache\tiles\tiles-api\3.0.8\tiles-api-3.0.8.jar;"%REPO%"\org\apache\tiles\tiles-autotag-core-runtime\1.2\tiles-autotag-core-runtime-1.2.jar;"%REPO%"\org\apache\tiles\tiles-request-jsp\1.0.7\tiles-request-jsp-1.0.7.jar;"%REPO%"\org\apache\tiles\tiles-request-api\1.0.7\tiles-request-api-1.0.7.jar;"%REPO%"\mysql\mysql-connector-java\8.0.24\mysql-connector-java-8.0.24.jar;"%REPO%"\com\google\protobuf\protobuf-java\3.11.4\protobuf-java-3.11.4.jar;"%REPO%"\org\mybatis\mybatis-spring\2.0.6\mybatis-spring-2.0.6.jar;"%REPO%"\org\mybatis\mybatis\3.5.7\mybatis-3.5.7.jar;"%REPO%"\org\springframework\spring-jdbc\5.3.6\spring-jdbc-5.3.6.jar;"%REPO%"\org\springframework\spring-beans\5.3.6\spring-beans-5.3.6.jar;"%REPO%"\org\springframework\spring-core\5.3.6\spring-core-5.3.6.jar;"%REPO%"\org\springframework\spring-jcl\5.3.6\spring-jcl-5.3.6.jar;"%REPO%"\org\springframework\spring-tx\5.3.6\spring-tx-5.3.6.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-databind\2.13.1\jackson-databind-2.13.1.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-annotations\2.13.1\jackson-annotations-2.13.1.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-core\2.13.1\jackson-core-2.13.1.jar;"%REPO%"\org\jsoup\jsoup\1.14.3\jsoup-1.14.3.jar;"%REPO%"\org\springframework\spring-context\5.3.6\spring-context-5.3.6.jar;"%REPO%"\org\springframework\spring-aop\5.3.6\spring-aop-5.3.6.jar;"%REPO%"\org\springframework\spring-expression\5.3.6\spring-expression-5.3.6.jar;"%REPO%"\org\springframework\spring-webmvc\5.3.6\spring-webmvc-5.3.6.jar;"%REPO%"\org\springframework\spring-web\5.3.6\spring-web-5.3.6.jar;"%REPO%"\org\aspectj\aspectjrt\1.6.10\aspectjrt-1.6.10.jar;"%REPO%"\org\slf4j\slf4j-api\1.6.6\slf4j-api-1.6.6.jar;"%REPO%"\org\slf4j\jcl-over-slf4j\1.6.6\jcl-over-slf4j-1.6.6.jar;"%REPO%"\org\slf4j\slf4j-log4j12\1.6.6\slf4j-log4j12-1.6.6.jar;"%REPO%"\log4j\log4j\1.2.15\log4j-1.2.15.jar;"%REPO%"\javax\inject\javax.inject\1\javax.inject-1.jar;"%REPO%"\javax\servlet\jstl\1.2\jstl-1.2.jar;"%REPO%"\com\coffeecongspring\web\1.0.0-BUILD-SNAPSHOT\web-1.0.0-BUILD-SNAPSHOT.war
set EXTRA_JVM_ARGUMENTS=
goto endInit

@REM Reaching here means variables are defined and arguments have been captured
:endInit

%JAVACMD% %JAVA_OPTS% %EXTRA_JVM_ARGUMENTS% -classpath %CLASSPATH_PREFIX%;%CLASSPATH% -Dapp.name="webapp" -Dapp.repo="%REPO%" -Dbasedir="%BASEDIR%" foo.Main %CMD_LINE_ARGS%
if ERRORLEVEL 1 goto error
goto end

:error
if "%OS%"=="Windows_NT" @endlocal
set ERROR_CODE=1

:end
@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" goto endNT

@REM For old DOS remove the set variables from ENV - we assume they were not set
@REM before we started - at least we don't leave any baggage around
set CMD_LINE_ARGS=
goto postExec

:endNT
@endlocal

:postExec

if "%FORCE_EXIT_ON_ERROR%" == "on" (
  if %ERROR_CODE% NEQ 0 exit %ERROR_CODE%
)

exit /B %ERROR_CODE%
