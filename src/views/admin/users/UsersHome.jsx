import React, { useEffect } from 'react'
import { Card } from '../../../components/admin/UsersCard'
import { getUsers } from "../../../api";
import { useDispatch } from 'react-redux';
import { setDashboardTitle } from '../../../actions/ui';

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( setDashboardTitle('Usuarios') )
  }, [])

  const titles = ['Status', 'Nombre', 'Email', 'Rol']
  
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers()
      .then((resp) => resp.json())
      .then((resp) => {
        setUsers(resp);
      });
  }, []);

  return (
    <div className="users">
      <Card
        type='usuario'
        titles={titles}
        rows={users}
      >
        
      </Card>
    </div>
  )
}

export default Home
