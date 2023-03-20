import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SimpleBar from 'simplebar-react';

const Scrollbar = styled(SimpleBar)``;

const statusMap = {
	Shipping: "yellow",
	Delivered: "white",
	Refunded: "red",
};

type statusType = "Shipping" | "Delivered" | "Refunded";

type orderType = {
	id: string;
	spend: number;
	store: { name: string };
	status: statusType;
};

type ShoppingListProps = {
	orders: orderType[];
	sx: any;
};

export const ShoppingList = (props: ShoppingListProps) => {
	const { orders = [], sx } = props;

	return (
		<Card sx={sx} style={{ backgroundColor: "#FFD8D2", borderRadius: "20px" }}>
			<CardHeader title="Orders" />
			<Box sx={{ minWidth: 800 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<b>Order</b>
							</TableCell>
							<TableCell>
								<b>Store</b>
							</TableCell>
							<TableCell>
								<b>Spend ($)</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order: orderType) => {
							return (
								<TableRow hover key={order.id}>
									<TableCell>{order.id}</TableCell>
									<TableCell>{order.store.name}</TableCell>
									<TableCell>{order.spend}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Box>
			<Divider />
			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button
					color="inherit"
					endIcon={
						<SvgIcon fontSize="small">
							<KeyboardArrowRightIcon />
						</SvgIcon>
					}
					size="small"
					variant="text"
				>
					View all
				</Button>
			</CardActions>
		</Card>
	);
};
