import config from '$lib/config.json';
import Home from 'virtual:icons/heroicons/home';
import NumberedList from 'virtual:icons/heroicons/numbered-list';
// import Map from 'virtual:icons/heroicons/map';
import ShoppingBag from 'virtual:icons/heroicons/shopping-bag';
import UserGroup from 'virtual:icons/heroicons/user-group';

export default [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Leaderboard', href: '/leaderboard', icon: NumberedList },
  // { label: 'Maps', href: '/maps', icon: Map },
  { label: 'Store', href: config.STORE, icon: ShoppingBag },
  { label: 'Staff', href: '/staff', icon: UserGroup }
];
