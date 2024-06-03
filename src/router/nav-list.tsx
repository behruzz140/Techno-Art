import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';

interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}

            
const navList:navListInterface[] = [
    {
      path:"/home"  ,
      title:"Category",
      icon: <CategoryIcon />,
    },
    {
        path:"/home/brands"  ,
        title:"Brands",
        icon: <AssignmentTurnedInIcon />,
    },
    {
        path:"/home/models"  ,
        title:"Models",
        icon: <ModelTrainingIcon />,
    },
    {
        path:"/home/products"  ,
        title:"Products",
        icon: <ShoppingCartIcon />,
    },
    {
        path:"/home/sales"  ,
        title:"Sales",
        icon: <MonetizationOnIcon />,
    },
    {
        path:"/home/settings"  ,
        title:"Settings",
        icon: <SettingsIcon />,
    },
]

export default navList;