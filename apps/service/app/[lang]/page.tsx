import { FileMenu } from '@/feature/fileMenu/component/FileMenu';
import { PatternSelect } from '@/feature/pattern/component/PatternSelect';
import { UserMenu } from '@/feature/user/component/UserMenu';
import { MusicTypeCheck } from '@/feature/pattern/component/MusicTypeCheck';
import { TableMenu } from '@/feature/tableMenu/component/TableMenu';
import { TableButton } from '@/feature/table/component/TableButton';
import { UserInfo } from '@/feature/table/component/UserInfo';
import { TableInfo } from '@/feature/table/component/TableInfo';
import { TableOrder } from '@/feature/table/component/TableOrder';
import { MusicTable } from '@/feature/table/component/MusicTable';

export default function Home() {
    return (
        <main
            className={
                'flex flex-col justify-center items-center w-full max-w-[1280px] p-[10px]'
            }
        >
            {/* File Menu */}
            <section className={'flex flex-col md:flex-row w-full'}>
                {/* How to description */}
                <div className={'flex-[2]'}>
                    <span>howto1</span>
                    <ol>
                        <li>howto2</li>
                        <li>howto3</li>
                        <li>howto4</li>
                    </ol>
                </div>

                {/* Menu Buttons */}
                <div className={'flex-[1]'}>
                    <FileMenu />
                </div>
            </section>

            {/* Table Menu */}
            <section className={'flex flex-col w-full max-w-[1280px]'}>
                {/* Title */}
                <div></div>

                {/* Pattern Selector */}
                <div
                    className={
                        'flex flex-col md:flex-row justify-center items-center w-full max-w-[1280px]'
                    }
                >
                    {/* Subtitle */}
                    <div></div>

                    {/* Selector Area */}
                    <div className={'flex justify-center items-center w-full'}>
                        <PatternSelect />
                    </div>
                </div>

                {/* User Menu */}
                <div
                    className={
                        'grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full max-w-[1280px]'
                    }
                >
                    <UserMenu />
                </div>

                {/* Music Type Checkbox */}
                <div>
                    <MusicTypeCheck />
                </div>

                {/* Table Option */}
                <div>
                    <TableMenu />
                </div>
            </section>

            {/* Table */}
            <section
                className={
                    'flex flex-col justify-center items-center w-full max-w-[1280px]'
                }
            >
                {/* title */}
                <div>
                    <span>Pump It Up Clear Table</span>
                    <div>
                        <TableButton />
                    </div>
                </div>

                {/* user info */}
                <div>
                    <UserInfo />
                </div>

                {/* table info */}
                <div>
                    <TableInfo />
                    <TableOrder />
                </div>

                {/* table */}
                <div className={'grid grid-cols-10'}>
                    <MusicTable />
                </div>
            </section>

            {/* Dialogs */}
        </main>
    );
}
