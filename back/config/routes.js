module.exports = app => {
    app.get('/lookfull', app.api.lookFull.getLookFull)
    app.post('/fullsave', app.api.lookFull.getLookFullSave)


    app.get('/lookparts/:id_lookfull_external', app.api.lookParts.getLookParts)
    app.post('/partssave', app.api.lookParts.getLookPartsSave)
        
}