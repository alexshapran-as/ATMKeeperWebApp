import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Input, Layout, Button, List, AutoComplete } from 'antd'; // Select,

const { Header, Sider, Content } = Layout;
// const { Option } = Select;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      list: [],
      items: ['Загрузить ключи', 'Сбросить ключи', 'Обновить ключи', 
              'Включить банкомат', 'Выключить банкомат', 'Перезагрузить банкомат',
              'Сообщить состояние устройств', 
              'Сообщить состояние диспенсера', 'Заблокировать диспенсер', 'Снять блокировку диспенсера',
              'Сервисное обслуживание банкомата', 'Инкассация банкомата',
              'Тест контроллера ББ', 'Тест датчиков КББ', 'Тест Д', 'Отключить КББ']
    }
  }

  fetchMyData = (string) => {
    fetch(`/send-command?command=${string}`, {
      method: 'GET',
      mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer'
    })
    .then(res => res.json())
    .then(jsonData => {
      console.log('jsonData',jsonData)
      console.log('this.state.list',this.state.list)
      this.setState({ search: '', list: [...this.state.list, jsonData.state] })
    })

    // this.setState({ search: '', list: [...list, search] })
  }

  render() {
    
    const { search, list, items } = this.state;

    console.log(this.state)

    return (
      <div className="App">
        <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >

            <AutoComplete
                onChange={e => this.setState({ search: e })}
                style={{ width: 480 }}
                dataSource={items}
                placeholder="Выберите команду"
                filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />

            <Button type="primary" onClick={() => this.fetchMyData(search)}>Отправить команду</Button>
  
            <List
              size="large"
              header
              footer
              bordered
              dataSource={list}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
        </Content>
      </div>
    );
  }
}

export default App;