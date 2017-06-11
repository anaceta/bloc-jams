var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumNumbers = {
    title: 'The Numbers',
    artist: 'Isaac Newton',
    label: 'Mathematics',
    year: '1701',
    albumArtUrl: 'assets/images/album_covers/06.png',
    songs: [
        { title: 'First Law', duration: '3:01' },
        { title: 'Second Law', duration: '4:01' },
        { title: 'Third Law', duration: '2:21'},
        { title: 'Gravity', duration: '4:14' },
        { title: 'Apples', duration: '3:15'}
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
            '<tr class="album-view-song-item">'
            + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
            + '  <td class="song-item-title">' + songName + '</td>'
            + '  <td class="song-item-duration">' + songLength + '</td>'
            + '</tr>'
        ;

    var $row = $(template);

    var clickHandler = function() {
        var songItemNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong === null) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        } else if (currentlyPlayingSong === songItemNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItemNumber) {
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songItemNumber;
        }
    };

    var onHover = function(event){
        var songItem = $(this).find('.song-item-number');
        var songItemNumber = songItem.attr('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
            songItem.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songItem = $(this).find('.song-item-number');
        var songItemNumber = songItem.attr('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
            songItem.html(songItemNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function (album) {
    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    // #2
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // #3
    $albumSongList.empty();
    // #4
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var findParentByClassName = function (element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        if (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class ="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
