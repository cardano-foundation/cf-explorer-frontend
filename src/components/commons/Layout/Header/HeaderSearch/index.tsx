import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { HeaderSearchIcon } from '../../../../../commons/resources';
import styles from './index.module.scss';

interface FormValues {
  filter: string;
  search: string
}

const HeaderSearch: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm<FormValues>();
  
  const handleSearch = () => {
    const values = form.getFieldsValue();
    if (values.search) {
      history.push(`/transaction/${values.search}${values.filter ? `?filter=${values.filter}` : ""}`);
      form.resetFields();
    }
  }
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.code === "Enter" || e.keyCode === 13 || e.which === 13) {
      handleSearch();
    }
  }

  return (
    <Form className={styles.searchBox} form={form}>
      <Form.Item name="filter" noStyle initialValue="">
        <Select
          className={styles.filterSelect}
          options={[
            {
              value: '',
              label: <span className={styles.filterOption}>All Filters</span>,
            },
            {
              value: 'other',
              label: <span className={styles.filterOption}>Other Filter</span>,
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="search" noStyle initialValue="">
        <Input
          required
          className={styles.inputSearch}
          type="search"
          spellCheck={false}
          placeholder="Search transaction, address, block, epoch, pool..."
          onKeyDown={handleKeydown}
        />
      </Form.Item>
      <Button className={styles.buttonSearch} htmlType="button" onClick={handleSearch}>
        <img src={HeaderSearchIcon} alt="search" />
      </Button>
    </Form>
  )

}

export default HeaderSearch;