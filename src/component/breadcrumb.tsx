import React, { useState } from 'react'
import { ChevronRight, Info } from 'lucide-react';
import Metadata from "../entity/metadata"
import * as HoverCard from '@radix-ui/react-hover-card';




interface BreadcrumbProps {
    metadata: Metadata;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ metadata: { loc } }) => {
    const categoryMap = loc.usage.reduce((acc, entry) => {
        if (!acc[entry.category]) {
            acc[entry.category] = [];
        }
        acc[entry.category].push(entry.sub_category);
        return acc;
    }, {} as Record<string, string[]>);
    const [open, setOpen] = useState(false);
    return (
        <div style={{ display: "block", textAlign: "left" }}>
            <span style={{ fontSize: "13px", color: "#687270" }}>{loc.L1}</span>
            <span>
                <ChevronRight size={13} />
            </span>
            {
                loc.L2 && (
                    <>
                        <span style={{ fontSize: "13px", color: "#687270" }}>{loc.L2}</span>
                        <ChevronRight size={14} />
                    </>
                )

            }
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#3D6B5F" }}>{loc.title}</span>
            {
                loc.usage && (
                    <HoverCard.Root openDelay={300} closeDelay={150} open={open} onOpenChange={setOpen}>
                        <HoverCard.Trigger asChild>
                            <Info 
                                style={{ cursor:"pointer", paddingLeft: "4px", color: "#687270" }} 
                                className="hoverable" size={14} 
                                onClick={() => setOpen((prev) => !prev)}
                            />
                        </HoverCard.Trigger>

                        <HoverCard.Portal>
                            <HoverCard.Content
                                sideOffset={8}
                                style={{
                                    width: '256px',
                                    backgroundColor: '#FAFAF7',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    border: '1px solid #e2e8f0',
                                    zIndex: 50,
                                }}
                            >
                                <span style={{fontSize: "15px", fontWeight: 600, color:"#273331"}}>Penggunaan lainnya dalam liturgi</span>
                                <ul>
                                {
                                    
                                    Object.entries(categoryMap).map(([category, subCategories]) => (
                                        <li key={category} style={{ marginBottom: '10px' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '12px', color: "#347A70" }}>{category}</span>
                                            <ul style={{ listStyleType: 'none', padding:0, margin: '4px 0 0 0' }}>
                                                {subCategories.map((subCategory, index) => (
                                                    <li key={index} style={{ fontSize: '12px' }}>
                                                        <span style={{color: "#687270"}} >
                                                            {subCategory}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                                }
                                </ul>
                                <HoverCard.Arrow style={{ fill: 'white' }} />
                            </HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
                )
            }
        </div >
    )
}
