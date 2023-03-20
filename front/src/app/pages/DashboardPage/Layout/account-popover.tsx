import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useContext } from 'react';

type AccountPopoverProps = {
	anchorEl: any;
	onClose: () => void;
	open: boolean;
};

export const AccountPopover = (props: AccountPopoverProps) => {
	const { anchorEl, onClose, open } = props;
	const router = useRouter();

	const handleSignOut = useCallback(() => {
		//   onClose?.();
		//   auth.signOut();
		//   router.push('/auth/login');
	}, []);

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: "left",
				vertical: "bottom",
			}}
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 200 } }}
		>
			<Box
				sx={{
					py: 1.5,
					px: 2,
				}}
			>
				<Typography variant="overline">Account</Typography>
				<Typography color="text.secondary" variant="body2">
					Linh VjpPro
				</Typography>
			</Box>
			<Divider />
			<MenuList
				disablePadding
				dense
				sx={{
					p: "8px",
					"& > *": {
						borderRadius: 1,
					},
				}}
			>
				<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
			</MenuList>
		</Popover>
	);
};
