var mongoose = require("mongoose");
var Song = require("./models/song");

var data = [
    {
        song: "No Thank You",
        artist: "Epik High",
        image: "http://www.ekkomusicrights.com/wp-content/uploads/cover_epikhigh_wonderful-450x450.jpg",
        description: "zsgezsegezsgzs",
        lyrics: "",
        link: "https://www.youtube.com/embed/dXTwfd7rh-0"
    },
    {
        song: "The Open Boat",
        artist: "Primary, Anda",
        image: "https://i.pinimg.com/originals/51/03/07/5103075d6970e810fa7721f7f99e4a78.png",
        description: "Retrowave vibe",
        lyrics: "",
        link: "https://www.youtube.com/embed/eNaw4OHMZyY"
    },
    {
        song: "Veranda",
        artist: "Thornapple",
        image: "https://3.bp.blogspot.com/-jk-rnm3we9A/WdmHv9f_seI/AAAAAAAAP6o/jIrNLHO2zx4Frptqtp6_S--pCNQcB9iqgCLcBGAs/s1600/COVER.png",
        description: "zsegszge",
        lyrics: "",
        link: "https://www.youtube.com/embed/u4s-2TvrRjE"
    },
    {
        song: "Comes And Goes",
        artist: "Hyukoh",
        image: "http://3.bp.blogspot.com/-OZf_o0qmMsk/VZizpDe5SmI/AAAAAAAAFVs/JprvGfOroeQ/s1600/460057.jpg",
        description: "Szseg",
        lyrics: "",
        link: "https://www.youtube.com/embed/ECMc1SB60E0"
    },
    {
        song: "Mango",
        artist: "Samuel Seo, Qim Isle",
        image: "http://cdn.eyesmag.com/wp-content/uploads/2017/06/08121237/Samuel-Seo-Isle-Qim-project-album-%E2%80%98Elbow%E2%80%99.jpg",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/iFFZmbv8yl0"
    },
    {
        song: "Hollywood",
        artist: "Black Skirt",
        image: "http://cfile7.uf.tistory.com/image/23172F4D56283D781E4184",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/uuGtrxDsrws"
    },
    {
        song: "I will keep the engine on",
        artist: "Deli Spice",
        image: "http://1.bp.blogspot.com/-jX9VMUuscyk/VmA9NxJurRI/AAAAAAAAIEo/OUyIG5bgkM4/s1600/cover.png",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/6deCV5n1mGQ"
    },
    {
        song: "Back In Time",
        artist: "E-sens",
        image: "http://m.rhythmer.net/data/upload/board/4/94/294/16294/14356617821462.jpg",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/ndSn6uRZNsU"
    },
    {
        song: "You",
        artist: "Neon Bunny",
        image: "https://princessoftea.files.wordpress.com/2014/03/neon-bunny-its-you-560x560.jpg",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/O0Z7-KpKJJA"
    },
    {
        song: "Know",
        artist: "C Jamm",
        image: "http://cmsimg.mnet.com/clipimage/album/240/002/154/2154887.jpg",
        description: "zsgezesgzz",
        lyrics: "",
        link: "https://www.youtube.com/embed/_eU6OLjlhDg"
    },
]

function seedDB(){
    Song.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed all songs");
            data.forEach(function(seed){
                Song.create(seed, function(err, artist){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added an artist");
                    }
                })
            })
        }
    })
};

module.exports = seedDB;