import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './Navbar';

const InventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    prodname: '',
    qty: '',
    price: '',
    status: ''
  });

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/inventory/${id}`)
        .then(response => response.json())
        .then(data => setItem(data))
        .catch(error => console.error('Error fetching inventory:', error));
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Use the appropriate URL for update vs. create:
    const url = item._id ? `/api/inventory/${item._id}` : '/api/inventory';
    const method = item._id ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    navigate('/inventories');
  };

  const title = <h2 className="mt-3">{item._id ? 'Edit Inventory' : 'Add Inventory'}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="prodname" className="h5 mt-3">Product Name</Label>
            <Input
              type="text"
              name="prodname"
              id="prodname"
              value={item.prodname || ''}
              onChange={handleChange}
              autoComplete="prodname"
            />
          </FormGroup>
          <FormGroup>
            <Label for="qty" className="h5 mt-3">Quantity</Label>
            <Input
              type="text"
              name="qty"
              id="qty"
              value={item.qty || ''}
              onChange={handleChange}
              autoComplete="qty"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price" className="h5 mt-3">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              value={item.price || ''}
              onChange={handleChange}
              autoComplete="price"
            />
          </FormGroup>
          <FormGroup>
            <Label for="status" className="h5 mt-3">Status</Label>
            <Input
              type="text"
              name="status"
              id="status"
              value={item.status || ''}
              onChange={handleChange}
              autoComplete="status"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" className="mt-3">
              Save
            </Button>{' '}
            <Button color="secondary" className="mt-3" tag={Link} to="/inventories">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default InventoryEdit;
