import * as React from 'react';
import {useState, useMemo} from 'react';
import {Card, CardHeader, CardContent, FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
import {format, subDays, addDays, startOfMonth, endOfMonth, parse, isValid} from 'date-fns';

import {Order} from '../types';
import {vi} from "date-fns/locale/vi";

const dateFormatter = (date: number): string => new Date(date).toLocaleDateString();
const monthFormatter = (month: string): string => {
    const date = new Date(month);
    return format(date, "'Tháng' M 'năm' yyyy", {locale: vi});
};

const priceFormatter = (price: number): string => new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
}).format(price);

const aggregateOrdersByDay = (orders: Order[], startDate: Date, endDate: Date): { [key: string]: number } =>
    orders
        .filter(order => order.status.id !== 7 && new Date(order.orderDate) >= startDate && new Date(order.orderDate) <= endDate)
        .reduce((acc, curr) => {
            const day = format(new Date(curr.orderDate), 'yyyy-MM-dd');
            if (!acc[day]) acc[day] = 0;
            acc[day] += curr.totalAmount;
            return acc;
        }, {} as { [key: string]: number });

const aggregateOrdersByMonth = (orders: Order[]): { [key: string]: number } =>
    orders
        .filter(order => order.status.id !== 7)
        .reduce((acc, curr) => {
            const month = format(startOfMonth(new Date(curr.orderDate)), 'yyyy-MM');
            if (!acc[month]) acc[month] = 0;
            acc[month] += curr.totalAmount;
            return acc;
        }, {} as { [key: string]: number });

const getRevenuePerDay = (orders: Order[], startDate: Date, endDate: Date): TotalByDay[] => {
    const daysWithRevenue = aggregateOrdersByDay(orders, startDate, endDate);
    const totalDays = Array.from({length: (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1}, (_, i) => addDays(startDate, i));
    return totalDays.map(date => ({
        date: date.getTime(),
        total: daysWithRevenue[format(new Date(date), 'yyyy-MM-dd')] || 0,
    }));
};

const OrderChart = (props: { orders?: Order[] }) => {
    const {orders} = props;
    const [timeFrame, setTimeFrame] = useState<string>('last30days');
    const [customStartDate, setCustomStartDate] = useState<any>(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
    const [customEndDate, setCustomEndDate] = useState<any>(format(new Date(), 'yyyy-MM-dd'));

    const uniqueMonths = useMemo(() => {
        const months = orders ? orders.map(order => format(startOfMonth(new Date(order.orderDate)), 'yyyy-MM')) : [];
        return Array.from(new Set(months)).sort((a, b) => (a > b ? 1 : -1));
    }, [orders]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTimeFrame(event.target.value as string);
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value > customEndDate) {
            setCustomEndDate(event.target.value);
        }
        setCustomStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value < customStartDate) {
            setCustomStartDate(event.target.value);
        }
        setCustomEndDate(event.target.value);
    };

    let data;
    let xAxisKey;
    let xAxisFormatter;

    if (orders) {
        switch (timeFrame) {
            case 'last30days':
                data = getRevenuePerDay(orders, subDays(new Date(), 30), new Date());
                xAxisKey = 'date';
                xAxisFormatter = dateFormatter;
                break;
            case 'custom':
                if (customStartDate && customEndDate && isValid(new Date(customStartDate)) && isValid(new Date(customEndDate))) {
                    data = getRevenuePerDay(orders, new Date(customStartDate), new Date(customEndDate));
                    xAxisKey = 'date';
                    xAxisFormatter = dateFormatter;
                } else {
                    data = [];
                }
                break;
            default:
                const selectedMonthStart = parse(timeFrame, 'yyyy-MM', new Date());
                const selectedMonthEnd = endOfMonth(selectedMonthStart);
                data = getRevenuePerDay(orders, selectedMonthStart, selectedMonthEnd);
                xAxisKey = 'date';
                xAxisFormatter = dateFormatter;
                break;
        }
    }

    return (
        <Card>
            <CardHeader title={"Doanh thu"}/>
            <CardContent>
                <FormControl variant="outlined" fullWidth margin="normal" sx={{display: "flex", flex: 1}}>
                    <InputLabel id="timeframe-select-label">Chọn thời gian</InputLabel>
                    <Select
                        labelId="timeframe-select-label"
                        value={timeFrame}
                        onChange={event => handleChange(event as any)}
                        label="Chọn thời gian"
                    >
                        <MenuItem value="last30days">30 ngày trước</MenuItem>
                        {uniqueMonths.map(month => (
                            <MenuItem key={month} value={month}>
                                {monthFormatter(month)}
                            </MenuItem>
                        ))}
                        <MenuItem value="custom">Chọn thời gian</MenuItem>
                    </Select>
                    {timeFrame === 'custom' && (
                        <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                            <TextField
                                label="Ngày bắt đầu"
                                type="date"
                                defaultValue={customStartDate}
                                onChange={handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Ngày kết thúc"
                                type="date"
                                defaultValue={customEndDate}
                                onChange={handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </div>
                    )}
                </FormControl>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <AreaChart data={data}
                                   margin={{
                                       top: 10,
                                       right: 30,
                                       left: 40,
                                       bottom: 0,
                                   }}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey={xAxisKey}
                                name="Time"
                                type="number"
                                scale="time"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={xAxisFormatter}
                            />
                            <YAxis dataKey="total" name="Revenue" tickFormatter={priceFormatter}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip
                                cursor={{strokeDasharray: '3 3'}}
                                formatter={(value: any) =>
                                    new Intl.NumberFormat(undefined, {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(value)
                                }
                                labelFormatter={(label: number | string) =>
                                    timeFrame === 'last30days' || timeFrame === 'custom' ? dateFormatter(label as number) : monthFormatter(label as string)
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

interface TotalByDay {
    date: number;
    total: number;
}

interface TotalByMonth {
    month: string;
    total: number;
}

export default OrderChart;
