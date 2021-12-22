import { NextPage } from 'next';
import { Layout } from '../components/layout';
import { MyProfile } from '../components/my-profile';

const MyProfilePage: NextPage = () => {
  return <Layout><MyProfile /></Layout>
}

export default MyProfilePage