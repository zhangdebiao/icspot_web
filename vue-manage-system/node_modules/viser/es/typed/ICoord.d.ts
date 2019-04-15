export interface IRectCoord {
    type?: 'rect';
    direction?: string;
}
export interface IPolarCoord {
    type?: 'polar' | 'theta' | 'helix';
    direction?: string;
    radius?: number;
    innerRadius?: number;
    startAngle?: number;
    endAngle?: number;
}
declare type ICoord = IRectCoord | IPolarCoord;
export default ICoord;
