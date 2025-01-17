module.exports = function (context, options) {
  return {
    name: 'pdf-loaders',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.node$/,
              use: "node-loader",
            },
            // {
            //   test: /\.pdf$/,
            //   type: 'asset/resource',              
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {
            //         name: '[path][name].[ext]',
            //       },
            //     },
            //     {
            //       loader: 'pdf-loader',
            //     },
            //   ],            
            // },
          ],
        },
      };
    },
  };
};