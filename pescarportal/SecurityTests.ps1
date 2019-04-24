<#	
	.NOTES
	===========================================================================
	 Created with: 	SAPIEN Technologies, Inc., PowerShell Studio 2019 v5.6.157
	 Created on:   	2/11/2019 3:26 PM
	 Created by:   	Roque
	 Organization: 	
	 Filename:     	SecurityTests.ps1
	===========================================================================
	.DESCRIPTION
		Simple script to use as an example when authenticating this api
#>

#Register new user
try {
	Invoke-RestMethod "http://localhost:8080/register?username=RasTest&password=Test1&firstName=Roque&lastName=Sosa&email=roque.sosa@jpmchase.com" -ErrorAction 'Stop'
} catch {
	$_ | Select-Object *
}

Start-Sleep 1

#Get token
$token = Invoke-RestMethod "http://localhost:8080/auth?username=RasTest&password=Test1"

Start-Sleep 1

#Call Endpoints for admins
"Non protected method:"
Invoke-RestMethod "http://localhost:8080/nonProtected" -Headers @{
	'Authorization' = "Bearer $($token.token)"
}

"Protected method:"
Invoke-RestMethod "http://localhost:8080/protected" -Headers @{
	'Authorization' = "Bearer $($token.token)"
}






