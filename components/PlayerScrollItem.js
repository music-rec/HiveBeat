import React, {useContext, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import scheme from '../assets/scheme';
import {videoContext} from '../context';

export default function PlayerScrollItem({IMAGE_SIZE, data, index}) {
  const context = useContext(videoContext);
  const [isNowPlaying, setIsNowPlaying] = useState(true);
  const [artists, setArtists] = useState('');
  useEffect(() => {
    const artists = [];
    data.artists.forEach(el => {
      el.name && artists.push(el.name);
    });
    setArtists(artists.join(', '));
    setIsNowPlaying(index - 1 == context.nowPlayingIndex);
  }, [context.nowPlayingIndex, context.nowPlaying]);
  return (
    <Pressable
      onPress={e => {
        if (isNowPlaying) return;
        const actualId = index - 1;
        context.setNowPlayingIndex(actualId);
      }}>
      <Image
        style={{
          marginRight: 10,
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          alignSelf: 'center',
          opacity: isNowPlaying ? 1 : 0.5,
        }}
        resizeMode={'cover'}
        resizeMethod={'scale'}
        borderRadius={15}
        elevation={1}
        source={{uri: data.thumbnailUrl}}
      />
      {!isNowPlaying && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            left: 10,
            right: 10,
            top: 0,
            bottom: 0,
            position: 'absolute',
          }}>
          <Text
            numberOfLines={4}
            style={{
              color: scheme.textColor,
              elevation: 2,
              fontWeight: '800',
              fontSize: 32,
              textShadowColor: '#000',
              textShadowOffset: {width: 0, height: 0},
              textShadowRadius: 25,
              textAlign: 'center',
            }}>
            {data.title}
          </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 20,
                fontWeight: '300',
                elevation: 2,
                color: scheme.textColor,
                textShadowRadius: 10,
                textShadowColor: '#000',
                textAlign: 'center',
                textShadowOffset: {width: 0, height: 0},
              }}>
              {artists}
            </Text>
        </View>
      )}
    </Pressable>
  );
}
