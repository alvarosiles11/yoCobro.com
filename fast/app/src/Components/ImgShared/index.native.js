import Share from 'react-native-share';
class ImgShared {
  static compartir(param) {
    var imageUrl = 'data:image/png;base64,' + param;
    let shareImage001 = {
      title: "titulo",
      message: 'mensaje',
      url: imageUrl,
      saveToFiles: true,
    };
    Share.open(shareImage001)
      .then((res) => { console.log(res); })
      .catch((err) => { err && console.log(err); });

    //   var imageUrl = 'data:image/png;base64,' + param;
    //   let shareImage002 = {
    //     title: "titulo",
    //     message: 'mensaje',
    //     saveToFiles: true,
    //     urls: [imageUrl, imageUrl],
    //     filename: 'test',
    //     social: Share.Social.WHATSAPP,
    //     whatsAppNumber: "69050028"
    //   };

    //   Share.shareSingle(shareImage002)
    //     .then((res) => { console.log(res); })
    //     .catch((err) => { err && console.log(err); });
    // }

  }
}

export default ImgShared;

