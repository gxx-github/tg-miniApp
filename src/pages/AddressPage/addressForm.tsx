"use client"

import { FC, useEffect, useState } from "react"
import { Form, Input, Button, Cascader, Switch, Toast, Dropdown, Space } from "antd-mobile"
import "./AddressForm.scss"
interface Address {
    id: string
    name: string
    phone: string
    province: string
    city: string
    district: string
    detailAddress: string
    isDefault: boolean
}
// Simplified region data for demo purposes
// In a real app, you would use a complete dataset
const options = [
    {
        label: '浙江',
        value: '浙江',
        children: [
            {
                label: '杭州',
                value: '杭州',
                children: [
                    {
                        label: '西湖区',
                        value: '西湖区',
                    },
                    {
                        label: '上城区',
                        value: '上城区',
                    },
                    {
                        label: '余杭区',
                        value: '余杭区',
                        disabled: true,
                    },
                ],
            },
            {
                label: '温州',
                value: '温州',
                children: [
                    {
                        label: '鹿城区',
                        value: '鹿城区',
                    },
                    {
                        label: '龙湾区',
                        value: '龙湾区',
                        disabled: true,
                    },
                    {
                        label: '瓯海区',
                        value: '瓯海区',
                    },
                ],
            },
            {
                label: '宁波',
                value: '宁波',
                children: [
                    {
                        label: '海曙区',
                        value: '海曙区',
                    },
                    {
                        label: '江北区',
                        value: '江北区',
                    },
                    {
                        label: '镇海区',
                        value: '镇海区',
                    },
                ],
            },
        ],
    },
    {
        label: '安徽',
        value: '安徽',
        children: [
            {
                label: '合肥',
                value: '合肥',
                children: [
                    {
                        label: '包河区',
                        value: '包河区',
                    },
                    {
                        label: '蜀山区',
                        value: '蜀山区',
                    },
                    {
                        label: '瑶海区',
                        value: '瑶海区',
                    },
                ],
            },
            {
                label: '芜湖',
                value: '芜湖',
                children: [
                    {
                        label: '镜湖区',
                        value: '镜湖区',
                    },
                    {
                        label: '弋江区',
                        value: '弋江区',
                    },
                    {
                        label: '湾沚区',
                        value: '湾沚区',
                    },
                ],
            },
        ],
    },
    {
        label: '江苏',
        value: '江苏',
        children: [
            {
                label: '南京',
                value: '南京',
                children: [
                    {
                        label: '玄武区',
                        value: '玄武区',
                    },
                    {
                        label: '秦淮区',
                        value: '秦淮区',
                    },
                    {
                        label: '建邺区',
                        value: '建邺区',
                    },
                ],
            },
            {
                label: '苏州',
                value: '苏州',
                children: [
                    {
                        label: '虎丘区',
                        value: '虎丘区',
                    },
                    {
                        label: '吴中区',
                        value: '吴中区',
                    },
                    {
                        label: '相城区',
                        value: '相城区',
                    },
                ],
            },
        ],
    },
]

export const longOptions = new Array(20).fill('').map((value, index) => ({
    label: '标题 ' + (index + 1),
    value: '' + (index + 1),
    children: new Array(20).fill('').map((value_, index_) => ({
        label: `标题 ${index + 1}/${index_ + 1}`,
        value: `${index + 1}/${index_ + 1}`,
        children: new Array(20).fill('').map((value__, index__) => ({
            label: `标题 ${index + 1}/${index_ + 1}/${index__ + 1}`,
            value: `${index + 1}/${index_ + 1}/${index__ + 1}`,
        })),
    })),
}))

export const sameValueOptions = [
    {
        label: '左转',
        value: '左转',
        children: [
            {
                label: '左转',
                value: '左转',
                children: [
                    {
                        label: '左转',
                        value: '左转',
                    },
                    {
                        label: '右转',
                        value: '右转',
                    },
                ],
            },
            {
                label: '右转',
                value: '右转',
                children: [
                    {
                        label: '左转',
                        value: '左转',
                    },
                    {
                        label: '右转',
                        value: '右转',
                    },
                ],
            },
        ],
    },
    {
        label: '右转',
        value: '右转',
        children: [
            {
                label: '左转',
                value: '左转',
                children: [
                    {
                        label: '左转',
                        value: '左转',
                    },
                    {
                        label: '右转',
                        value: '右转',
                    },
                ],
            },
            {
                label: '右转',
                value: '右转',
                children: [
                    {
                        label: '左转',
                        value: '左转',
                    },
                    {
                        label: '右转',
                        value: '右转',
                    },
                ],
            },
        ],
    },
]

interface AddressFormProps {
    onSubmit: (address: Address) => void
    initialValues?: Address | null
}

export const AddAddressPage: FC = () => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [regionLabels, setRegionLabels] = useState<string[]>([])
    const [regionValues, setRegionValues] = useState<string[]>([])
    const [initialValues, setinitialValues] = useState<Address | null>(null)

    const [value, setValue] = useState<string[]>([])
    // Set form values when editing an existing address
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                phone: initialValues.phone,
                detailAddress: initialValues.detailAddress,
                isDefault: initialValues.isDefault,
            })

            // Set region display values
            setRegionLabels([initialValues.province, initialValues.city, initialValues.district])

            // Note: In a real app, you would need to find the actual values
            // that correspond to these labels in your region data
        }
    }, [initialValues, form])

    const handleFinish = (values: any) => {
        if (regionValues.length !== 3 && !initialValues) {
            Toast.show({
                content: "Please select your region",
                position: "bottom",
            })
            return
        }

        const newAddress: Address = {
            id: initialValues?.id || '121212',
            name: values.name,
            phone: values.phone,
            province: regionLabels[0] || initialValues?.province || "",
            city: regionLabels[1] || initialValues?.city || "",
            district: regionLabels[2] || initialValues?.district || "",
            detailAddress: values.detailAddress,
            isDefault: values.isDefault,
        }

        // onSubmit(newAddress)
    }

    const handleRegionConfirm = (val: string[], extend: any) => {
        console.log(val, 'vallll');

        // setRegionValues(val)
        // setRegionLabels(extend.items.map((item: any) => item.label))
        // setVisible(false)
    }

    return (
        <div className="address-form">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                footer={
                    <Button block type="submit" color="primary" size="large">
                        {initialValues ? "Update Address" : "Save Address"}
                    </Button>
                }
            >
                <div className="addressDom">
                    <Form.Item
                        name="First Name"
                        label="First Name"
                    // rules={[{ required: true, message: "Please enter First name" }]}
                    >
                        <Input placeholder="First name" />
                    </Form.Item>
                    <Form.Item
                        name="Last Name"
                        label="Last Name"
                    // rules={[{ required: true, message: "Please enter Last name" }]}
                    >
                        <Input placeholder="Last name" />
                    </Form.Item>
                    <Form.Item
                        name="Tel"
                        label="Tel"
                    // rules={[{ required: true, message: "Please enter Last name" }]}
                    >
                        <Dropdown>
                            <Dropdown.Item key='sorter' title='排序'>
                                <div style={{ padding: 12 }}>
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                    排序内容
                                    <br />
                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                        <Input placeholder="Please enter your phone number" />
                    </Form.Item>
                </div>
                <div className="cityDom">
                    <Form.Item label="Region"
                        rules={[{ required: true, message: "Please select your region" }]}
                    >
                        <Button onClick={() => setVisible(true)} className="region-selector">
                            {regionLabels.length > 0 ? regionLabels.join(" / ") : "Select province / city / district"}
                        </Button>
                        <Cascader
                            options={options}
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                            }}
                            value={value}
                            onConfirm={setValue}
                            onSelect={(val, extend) => {
                                console.log('onSelect', val, extend.items)
                            }}
                        >
                            {items => {
                                if (items.every(item => item === null)) {
                                    return '未选择'
                                } else {
                                    return items.map(item => item?.label ?? '未选择').join('-')
                                }
                            }}
                        </Cascader>
                    </Form.Item>
                </div>

            </Form>
        </div>
    )
}

