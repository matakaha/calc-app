// Azure Static Web Apps - calc-app-20260222
// Standard プラン / East Asia リージョン

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: 'calc-app-20260222'
  location: 'eastasia'
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
}

output defaultHostname string = staticWebApp.properties.defaultHostname
output resourceId string = staticWebApp.id
