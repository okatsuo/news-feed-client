import { NextPage } from 'next';
import { Layout } from '../components/layout';
import { MyProfile } from '../components/my-profile';
import { AuthenticateUser } from '../utils/authenticate';

const MyProfilePage: NextPage = () => {
  return (
    <AuthenticateUser>
      <Layout>
        <MyProfile />
      </Layout>
    </AuthenticateUser>
  )
}

export default MyProfilePage