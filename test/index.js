describe('start()' , async => {
    it('should resolve to true if an MongoInstanceData is resolved by _startUpInstance', async () => {
        return new Promise(function (resolve) {
            yourFunction().then(function (result) {
                resolve(result);

            });
        });
    });

});

const yourFunction = async () =>  {
    require('./test');
};
