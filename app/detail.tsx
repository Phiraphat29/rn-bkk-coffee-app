import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Detail() {
    const params = useLocalSearchParams()

    const handleOpenPhone = () => {
        Linking.openURL(`tel:${params.phone as string}`)
    }

    const handleOpenMap = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${params.name as string}&query_place_id=${params.id as string}`
        const appleMapsUrl = `https://maps.apple.com/?q=${params.name as string}&ll=${params.latitude as string},${params.longitude as string}`

        Linking.openURL(googleMapsUrl).then((supported) => {
            if (supported) {
                Linking.openURL(googleMapsUrl)
            } else {
                Linking.openURL(appleMapsUrl)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <Image source={{ uri: params.image_url as string }} style={styles.detailImage} />
            <View style={styles.detailContainer}>
                <Text style={styles.detailName}>{params.name as string}</Text>
                <Text style={styles.detailDistrict}>{params.district as string}</Text>
                <Text style={styles.detailDescription}>{params.description as string}</Text>
                <TouchableOpacity style={styles.detailPhone} onPress={() => { handleOpenPhone() }}>
                    <Text style={styles.detailPhoneText}>📞 {params.phone as string}</Text>
                </TouchableOpacity>
                <Text style={styles.detailMapLabel}>แผนที่ร้าน</Text>
                <MapView style={styles.detailMap} initialRegion={{
                    latitude: parseFloat(params.latitude as string),
                    longitude: parseFloat(params.longitude as string),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                    <Marker coordinate={{
                        latitude: parseFloat(params.latitude as string),
                        longitude: parseFloat(params.longitude as string),
                    }}
                        title={params.name as string}
                        description={params.description as string}
                        onPress={() => { handleOpenMap() }}
                    />
                </MapView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailContainer: {
        padding: 10,
        gap: 10,
    },
    detailImage: {
        width: '100%',
        height: 200,
    },
    detailName: {
        fontSize: 20,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#72594A',
    },
    detailDistrict: {
        fontSize: 14,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#868686',
    },
    detailDescription: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#000000',
    },
    detailPhone: {
        backgroundColor: '#24E63E',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    detailPhoneText: {
        fontSize: 16,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#fff',
    },
    detailMapLabel: {
        fontSize: 18,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#000000',
        marginBottom: "5%",
    },
    detailMap: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: "10%",
    },
})