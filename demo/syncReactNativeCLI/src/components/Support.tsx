import Icon from "@react-native-vector-icons/fontawesome6";
import { TouchableOpacity } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import { openLink } from "../utils/openLink";


export function Support() {
    const { toggleTheme } = useThemeContext();
    
    return (
        <>
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
            <Icon name="moon" size={22} color='white' />
        </TouchableOpacity><TouchableOpacity onPress={() => openLink('https://www.aeropay.com/support')}>
                <Icon name="circle-question" size={22} color='white' />
        </TouchableOpacity>
        </>
    );
}