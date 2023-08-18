/* eslint-disable react/prop-types */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useStockCall from '../hooks/useStockCall';
import { modalStyle } from '../styles/globalStyles';
import { useSelector } from 'react-redux';



export default function PurchaseModal({ open, setOpen }) {

    const { createStockData } = useStockCall()
    const { products } = useSelector(state => state.stock)
    const { brands } = useSelector(state => state.stock)
    const { firms } = useSelector(state => state.stock)

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>

                        <Formik
                            initialValues={
                                {

                                    firm_id: "",
                                    brand_id: "",
                                    product_id: "",
                                    quantity: "",
                                    price: ""
                                }
                            }

                            onSubmit={(values) => {
                                createStockData('purchases', values)
                                handleClose()
                            }}
                        >
                            {
                                ({ handleChange, handleBlur, values }) => (
                                    <Form>
                                        <Typography variant={"h6"} color={"error"} mb={2}> Add New Purchase  </Typography>
                                        <Box
                                            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel id="Firm">Firm</InputLabel>
                                                <Select
                                                    labelId="Firm"
                                                    name="firm_id"
                                                    id="Firm"
                                                    label="Firm"
                                                    onChange={handleChange}
                                                    value={values.firm_id}
                                                >
                                                    {
                                                        firms.map(firm => <MenuItem key={firm.id} value={firm.id}>{firm.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <InputLabel id="Brand">Brand</InputLabel>
                                                <Select
                                                    labelId="Brand"
                                                    name="brand_id"
                                                    id="Brand"
                                                    label="Brand"
                                                    onChange={handleChange}
                                                    value={values.brand_id}
                                                >
                                                    {
                                                        brands.map(brand => <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <InputLabel id="Product">Product</InputLabel>
                                                <Select
                                                    labelId="Product"
                                                    name="product_id"
                                                    id="Product"
                                                    label="Product"
                                                    onChange={handleChange}
                                                    value={values.product_id}
                                                >
                                                    {
                                                        products.map(product => <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                label="Quantity"
                                                name="quantity"
                                                id="quantity"
                                                type="number"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.quantity}
                                            />
                                            <TextField
                                                label="Price"
                                                name="price"
                                                id="price"
                                                type="number"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                            />
                                            <Button variant="contained" type="submit">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}