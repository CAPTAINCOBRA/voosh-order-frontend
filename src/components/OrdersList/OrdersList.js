import React from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import { Container, Table, Badge } from "react-bootstrap";

const OrdersList = () => {
  const allProducts = useSelector((state) => state.order.allOrders);

  return (
    <div>
      <Header />
      <h1 className="m-auto text-center">Orders List</h1>
      <Container fluid md="auto" className="WatchListContainer">
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr className="TableHeader">
              <th>#</th>
              <th>TransAction Id</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          {allProducts?.map((product, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <Badge bg="dark">{index + 1}</Badge>
                  </td>
                  <td>
                    <a href={product?.url} target="_blank">
                      {product?.transaction_id}
                    </a>
                  </td>
                  <td md="auto">{product?.productName}</td>
                  <td>{product?.amount}</td>
                  <td>{product?.address}</td>
                  <td md="auto">{product?.status}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Container>
    </div>
  );
};

export default OrdersList;
