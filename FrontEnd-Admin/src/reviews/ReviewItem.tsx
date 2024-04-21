import * as React from 'react';
import {Fragment} from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Link as MuiLink,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {
    useCreatePath,
    ReferenceField,
    FunctionField,
    TextField,
    useRecordContext,
} from 'react-admin';

import AvatarField from '../users/AvatarField';
import {Customer, Review} from '../types';

export const ReviewItem = () => {
    const record = useRecordContext<Review>();
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (
        <MuiLink
            to={createPath({
                resource: 'review',
                type: 'edit',
                id: record.id,
            })}
            component={Link}
            underline="none"
            color="inherit"
        >
            <ListItem>
                <ListItemAvatar>
                    <ReferenceField
                        source="reviewer"
                        reference="user"
                        link={false}
                    >
                        <AvatarField size="40"/>
                    </ReferenceField>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Fragment>
                            <ReferenceField
                                source="reviewer"
                                reference="user"
                                link={false}
                            >
                                <FunctionField<Customer>
                                    render={record =>
                                        `${record.userInfo.fullName}`
                                    }
                                    variant="subtitle1"
                                />
                            </ReferenceField>{' '}
                            on{' '}
                            <ReferenceField
                                source="product"
                                reference="product"
                                link={false}
                            >
                                <TextField
                                    source="reference"
                                    variant="subtitle1"
                                />
                            </ReferenceField>
                        </Fragment>
                    }
                    secondary={record.content}
                    secondaryTypographyProps={{noWrap: true}}
                />
            </ListItem>
        </MuiLink>
    );
};
