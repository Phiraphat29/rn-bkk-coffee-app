import { supabase } from '@/services/supabase'
import { CoffeeShop } from '@/types'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
    //* State to store the coffee shops
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([])

    //* Effect to fetch the coffee shops
    useEffect(() => {
        const fetchCoffeeShops = async () => {
            const { data, error } = await supabase.from('coffee_shops').select('*').order('name', { ascending: true })
            if (error) {
                Alert.alert('คำเตือน', "เกิดข้อผิดพลาดในการดึงข้อมูล")
            } else {
                setCoffeeShops(data)
            }
        }
        fetchCoffeeShops()
    }, [])

    //* function component to render the coffee shop item
    const CoffeeShopItem = ({ item }: { item: CoffeeShop }) => {
        return (
            <TouchableOpacity style={styles.coffeeShopItem} onPress={() => router.push({
                pathname: '/detail',
                params: {
                    id: item.id,
                    name: item.name,
                    district: item.district,
                    description: item.description,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    image_url: item.image_url,
                    phone: item.phone,
                }
            })}>
                <Image source={{ uri: item.image_url }} style={styles.coffeeShopItemImage} />
                <View>
                    <Text style={styles.coffeeShopItemTextName}>{item.name}</Text>
                    <Text style={styles.coffeeShopItemTextDistrict}>📍{item.district}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            contentContainerStyle={styles.flatListContent}
            data={coffeeShops}
            renderItem={CoffeeShopItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )
}

const styles = StyleSheet.create({
    flatListContent: {
        padding: 10,
    },
    coffeeShopItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
    },
    coffeeShopItemTextName: {
        fontSize: 20,
        fontFamily: 'NotoSansThai_700Bold',
        color: '#72594A',
    },
    coffeeShopItemTextDistrict: {
        fontSize: 14,
        fontFamily: 'NotoSansThai_400Regular',
        color: '#868686',
    },
    coffeeShopItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    }
})