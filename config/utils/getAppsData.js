const path = require('path')
const glob = require('glob-all')


function getEntryName(appName, pageName) {
    return `${appName}/${pageName}`
}


function getAppsData() {
    let apps = glob.sync(['src/apps/*']).map((path) => path.split('/').pop())

    let mockData = apps.reduce((acc, appName) => {
        let mockData = glob
            .sync([`src/mockData/${appName}/*.data.js`])
            .reduce((acc, p) => {
                let pageName = path.basename(p).replace('.page.data.js', '')
                acc[pageName] = require(path.resolve(p))
                return acc
            }, {})
        acc[appName] = mockData
        return acc
    }, {})

    let pages = apps.reduce((acc, appName) => {
        let pages = glob
            .sync([`src/apps/${appName}/pages/*/*.page.pug`])
            .map((p) => ({ src: p, pageName: path.basename(p).replace('.page.pug', ''), appName }))

        return acc.concat(pages)
    }, [])


    let defaultAliases = {
        $common: path.resolve('src/common'),
        $static: path.resolve('src/static'),
    }
    let aliases = apps.reduce((acc, appName) => {
        acc[`$${appName}`] = path.resolve(`src/apps/${appName}`)
        return acc
      }, defaultAliases)

    let entries = pages.reduce((acc, { appName, pageName }) => {
        let appEntries = glob.sync([`src/apps/${appName}/commonEntry.js`, `src/apps/${appName}/pages/${pageName}/${pageName}.page.js`, `src/apps/${appName}/pages/${pageName}/${pageName}.page.scss`])
            .map((p) => path.resolve(p))
            
        acc[getEntryName(appName, pageName)] = appEntries
        return acc
    }, {})

    return { pages, mockData, apps, aliases, entries }

}


module.exports = {
    getEntryName,
    getAppsData
}